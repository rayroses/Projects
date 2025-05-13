import http from 'http';
import connectionPool from './pool.js'


const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const crud = async (sqlStatement, bindParams) => {
        console.log(sqlStatement, bindParams)
        try {
            const result = await connectionPool.execute(
                sqlStatement, bindParams
            );
            return result;
        }
        catch (e) {
            throw e;
        }
    }
    const handleResponse = (statusCode, objectToStringify) => {
        res.writeHead(statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(objectToStringify));
    }
    // Handle OPTIONS preflight request
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }
    if (req.url === '/') {
        if (req.method === 'GET') {
            try {
                const properties = await crud('SELECT * FROM properties_to_buy');
                handleResponse(200, properties)
            }
            catch (e) {
                handleResponse(500, { error: e.message })
            }
        }
        else if (req.method === 'POST') {
            try {
                let body = '';
                req.on('data', chunk => {
                    body += chunk;
                });
                req.on('end', async () => {
                    try {
                        const formData = JSON.parse(body);
                        const { name, phone, email, soleOwner, street, city, state, zip } = formData;
                        const [response] = await crud('INSERT INTO  properties_to_sell (street, city, state, zip) VALUES (?,?,?,?)', [street, city, state, zip]);
                        if (response.affectedRows === 0) {
                            throw new Error('Insert failed: No rows affected.');
                        }
                        const insertedPropertyId = response.insertId;
                        const [response2] = await crud('INSERT INTO  home_owners (name, phone, email, soleOwner) VALUES (?,?,?,?)', [name, phone, email, soleOwner])
                        if (response2.affectedRows === 0) {
                            throw new Error('Insert failed: No rows affected.');
                        }
                        const insertedOwnerId = response2.insertId;
                        const [response3] = await crud('UPDATE properties_to_sell SET owner_id=? WHERE id=? ', [insertedOwnerId, insertedPropertyId]);
                        if (response3.affectedRows === 0) {
                            throw new Error('Insert failed: No rows affected.');
                        }
                        handleResponse(200, {
                            message: 'Form received',
                            data: formData
                        })
                    }
                    catch (e) {
                        handleResponse(500, { error: e.message })
                    }
                });
            }
            catch (e) {
                handleResponse(500, { error: e.message })
            }
        }
        else {
            handleResponse(405, { error: 'Only GETs and POSTs are supported' })
        }
    }
    else {
        handleResponse(404, { error: `the path ${req.url} is not found` })

    }
});
server.listen(3003);