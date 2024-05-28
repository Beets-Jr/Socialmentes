import { useState } from 'react';

import { initializeApp } from 'firebase/app';
import { db, auth } from '../../Database/FirebaseConfig.mjs'
import { createUserWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, FacebookAuthProvider } from 'firebase/auth';

function Login() {

    // // Email e senha do usuário atualmente logados (recuperado do Firebase Auth)
    // const [email, setEmail] = useState('');
    // const [nome, setNome] = useState('');

    // // Campos dos formulários
    // const [emailAuth, setEmailAuth] = useState('');
    // const [senhaAuth, setSenhaAuth] = useState('');

    // // Quando o usuário se logar ou deslogar
    // const atualizaUser = () => {
    //     const user = auth.currentUser;
    //     if (user) {
    //         setEmail(user.email);
    //         setNome(user.displayName);
    //     } else {
    //         setEmail('');
    //         setNome('');
    //     }
    // };


    // const authWithEmail = (e) => {
    //     e.preventDefault();
        
    //     signInWithEmailAndPassword(auth, emailAuth, senhaAuth)
    //         .then(userCredential => {
    //             const user = userCredential.user;
    //             console.log(`nome: ${user.displayName}, email: ${user.email}`);
    //             atualizaUser();
    //         })
    //         .catch(error => {
    //             console.log(`${error.code} --- ${error.message}`);
    //         })

    //     setEmailAuth('');
    //     setSenhaAuth('');
    // };

    // const loginWithGoogle = (e) => {
    //     e.preventDefault();

    //     signInWithPopup(auth, googleProvider)
    //         .then( (resp) => {
    //             const credential = GoogleAuthProvider.credentialFromResult(resp);
    //             const idToken = credential.idToken;
    //             const accessToken = credential.accessToken;
    //             atualizaUser();

    //             return fetch('http://localhost:3334/authgoogle', {
    //                 method: "POST",
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     idToken: idToken,
    //                     accessToken: accessToken
    //                 })
    //             })
    //         })
    //         .then( (resp) => {
    //             if (!resp.ok) {
    //                 console.log('Não foi possível se conectar ao servidor!');
    //             }
    //             return resp.json()
    //         })
    //         .then( (body) => { return console.log(body) })
    //         .catch( error => {
    //             console.log(`${error.code} --- ${error.message}`);
    //         })

    // };

    // const loginWithFacebook = (e) => {
    //     e.preventDefault();

    //     signInWithPopup(auth, faceProvider)
    //         .then((result) => {
    //             const credential = FacebookAuthProvider.credentialFromResult(result);
    //             const accessToken = credential.accessToken;
    //             atualizaUser();

    //             return fetch('http://localhost:3334/authfacebook', {
    //                 method: "POST",
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     accessToken: accessToken
    //                 })
    //             })
    //         })
    //         .then((resp) => { return resp.json() })
    //         .then((body) => { return console.log(body) })
    //         .then(() => { return console.log(nome) })
    //         .catch(error => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log(`${errorCode} --- ${errorMessage}`);
    //         })

    // };

    // const sair = async () => {
    //     await auth.signOut();
    //     atualizaUser();
    // }

    // return (
    //     <div className="App">

    //         { (nome || email) &&
    //             <Header sair={sair} nome={nome || email} />
    //         }

    //         <h1>Authentication</h1>

    //         <form onSubmit={createWithEmail}>
    //             <h2>Criar com email e senha</h2>
    //             <input type="text" placeholder="Digite seu email" value={emailCreate} onChange={e => setEmailCreate(e.target.value)} />
    //             <br />
    //             <input type="password" placeholder="Digite sua senha" value={senhaCreate} onChange={e => setSenhaCreate(e.target.value)} />
    //             <br />
    //             <input type="submit" value="Criar" />
    //         </form>

    //         <form onSubmit={authWithEmail}>
    //             <h2>Autenticação com email</h2>
    //             <input type="text" placeholder="Digite seu email" value={emailAuth} onChange={e => setEmailAuth(e.target.value)} />
    //             <br />
    //             <input type="password" placeholder="Digite sua senha" value={senhaAuth} onChange={e => setSenhaAuth(e.target.value)} />
    //             <br />
    //             <input type="submit" value="Entrar" />
    //         </form>

    //         <form onSubmit={loginWithGoogle}>
    //             <h2>Autenticação com google</h2>
    //             <input type="submit" value="Entrar" />
    //         </form>

    //         <form onSubmit={loginWithFacebook}>
    //             <h2>Autenticação com facebook</h2>
    //             <input type="submit" value="Entrar" />
    //         </form>

        //</div>
        <></>
    //);
}

export default Login;