module.exports.signUpErrors = (err) => {
    let errors = { username: '', email: '', password: '' }

    if (err.message.includes('username'))
        errors.password = "Nom d'utilisateur déjà utilisé";

    if (err.message.includes('email'))
        errors.email = "Email incorrect";

    if (err.message.includes('password'))
        errors.email = "Le mot de passe noit faire 8 caractère minimum";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('username'))
        errors.username = "Ce nom d'utilisateur est déjà utilisé.";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = 'Cet email est déjà utilisé.'
        
    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { email: '', password:'' }

    if (err.message.includes('email')) 
    errors.email = "Email inconnu.";

    if (err.message.includes('password'))
        errors.password = "Le mot de passe incorrect."
    return errors
}
