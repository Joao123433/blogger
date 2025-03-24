import { useState } from 'react';
import axios from 'axios';

export function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		try {
			const response = await axios.post('http://localhost:3000/login', {
				email,
				password,
			});
			localStorage.setItem('token', response.data.token); // Armazena o token
			alert('Login realizado com sucesso!');
		} catch (error) {
			alert('Erro ao realizar login. Verifique suas credenciais.');
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Senha"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={handleLogin}>Entrar</button>
		</div>
	);
}