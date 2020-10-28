# Sistema CRUD - Gerenciador de Usuários

Este serviço é dividido em duas partes, usuário administrador e usuário padrão, o deshbord do usuario padãro possui a função de informação sobre o usuario e sua edição, já o usuário administrador pode visualizar e editar todos os usuários cadastrados.

### Front-end

	git clone https://github.com/GustavoFortti/Case-Mind.git
	cd web/ | npm install
	yarn start

### Back-end

	cd server/ | npm install
	yarn start

- Criar usuário.

		routes.post('/user', upload.single('path'), UserController.create);
- Autenticação do usuário.

		routes.post('/user/auth', UserController.authenticate);
- Listar usuários.

		routes.get('/user/adm', UserAdmController.index);
- Mostrar usuário.

		routes.get('/user/:id', UserController.show);
- Atualizar usuário.
	
		routes.put('/user/:id', UserController.alter);
- Alterar nivel do usuário ( usuário padrão: 1 - usuário administrador: 999 - usuário desabilitado: 0).

		routes.put('/user/adm/:id', UserAdmController.alter);
- Alterar entre online e ofline (0 e 1).
	
		routes.put('/user/online/:id', UserController.online);

##### Banco de dados

	Tabela: users {
			id: int
			name: string
			cpf: string
			email: string
			password: string
			online: string
			level: string
			path: string
		}		



# Tecnologias

- ReactJs
- Node
