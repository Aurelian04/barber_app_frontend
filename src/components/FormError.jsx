function FormError({ error }) {
    if (!error) {
        return null
    }

    return (
        <p>
            {Array.isArray(error) ? error[0] : error}
        </p>
    )
}

export default FormError