export class User {
  uid: string = ''; // ID unique (UUID)
  name: string = ''; // Nom de l'utilisateur
  email: string = ''; // Email
  password: string = ''; // Mot de passe (hash)
  imagePath: string = 'default_img_path'; // Chemin de l'image (avec une valeur par défaut)
  role: string = ''; // Rôle de l'utilisateur (par exemple "admin")
  createdAt: Date = new Date(); // Date de création
  updatedAt: Date = new Date(); // Date de mise à jour
  refreshToken: string | null = null; // Refresh token
  resetToken: string | null = null; // Reset token
  idRole: number = 0; // ID de rôle (clé étrangère si applicable)
  Role: { id: number; role: string } = { id: 0, role: '' }; // Objet Role (relation potentielle avec la table Role dans la base de données)
}
