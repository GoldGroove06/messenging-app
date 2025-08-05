import React from 'react'

export default function Logout() {

    React.useEffect(() => {
        const logout = async () => {
            const response = await fetch('http://localhost:3000/log-out', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await response.json();
            console.log(data);
        }
        logout()
    })
    return (
        <div>Logout</div>
    )
}