import React, { useState } from 'react';
import axios from 'axios';

const PostData = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [responseHeader, setResponseHeader] = useState('');
    const [responseData, setResponseData] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://chimpu.xyz/api/post.php', {
                phonenumber: phoneNumber,
            });

            // Extract the headers from the response
            const headers = response.headers;

            // Convert the headers object to a string for display
            const headersString = JSON.stringify(headers, null, 2);

            // Update the state with the received data
            setResponseData(JSON.stringify(response.data, null, 2));
            // Update the state with the received headers
            setResponseHeader(headersString);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Post Data to API</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Phone Number:
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <div>
                <h3>Response Data:</h3>
                <pre>{responseData}</pre>
            </div>
            <div>
                <h3>Response Headers:</h3>
                <pre>{responseHeader}</pre>
            </div>
        </div>
    );
};

export default PostData;
