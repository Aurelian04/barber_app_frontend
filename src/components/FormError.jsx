function FormError({ error }) {
    if (!error) {
        return null
    }

    return (
        <p>
            {error[0]}
        </p>
    )
}

export default FormError