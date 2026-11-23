export const login = (data) => 
    fetch("/api/auth/login", {
        headers: { "Content-type": "application/json"},
        method: "POST",
        body: JSON.stringify(data),
    }).then((r) => r.json());