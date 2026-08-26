async function processWithBackend(data) {
    const response = await fetch(
        "/api/process",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.error
        );
    }

    return result;
}