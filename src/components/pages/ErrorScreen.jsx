import React from 'react';

function ErrorScreen({ errorMessage }) {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Oops! Something went wrong.</h1>
            <p style={styles.message}>{errorMessage || 'An unknown error occurred.'}</p>
        </div>
    );
}

// Styles
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        backgroundColor: '#f8d7da',
        color: '#721c24',
        textAlign: 'center',
    },
    header: {
        fontSize: '2rem',
        marginBottom: '1rem',
    },
    message: {
        fontSize: '1rem',
    }
};

export default ErrorScreen;
