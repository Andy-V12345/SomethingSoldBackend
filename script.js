const Amplify = window.aws_amplify.Amplify;
const Auth = window.aws_amplify.Auth;


Amplify.configure({
    Auth: {
        userPoolId: 'us-east-2_VT4BO7Yf1', // Replace with your User Pool ID
        userPoolWebClientId: '3rdru5rrbr89tvm7q5d98v4kto', // Replace with your App Client ID
        region: 'us-east-2', // Replace with your AWS region
    }
});

// Function to handle user sign-up
async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        // Call AWS Cognito to sign up the user
        await Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email,
            },
        });
        document.getElementById('message').textContent = 'Verification code sent to your email';
        window.location.href = 'verify.html'
    } catch (error) {
        document.getElementById('message').textContent = error.message;
    }
}

// Function to handle user sign-in
async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        // Call AWS Cognito to sign in the user
        await Auth.signIn(email, password);
        // Redirect to verification page on successful sign-in
        window.location.href = 'home.html';
    } catch (error) {
        document.getElementById('message').textContent = error.message;
    }
}

// Function to handle email verification
async function confirmSignUp() {
    const email = 'andyvu04@gmail.com'
    const verificationCode = document.getElementById('verificationCode').value;
    try {
        // Call AWS Cognito to confirm the sign-up
        await Auth.confirmSignUp(email, verificationCode);
        document.getElementById('message').textContent = 'Email verified successfully';
    } catch (error) {
        document.getElementById('message').textContent = error.message;
    }
}
