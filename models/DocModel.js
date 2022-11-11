/**
 * @typedef {object} CartModel La carte model de l'UTILISATEUR
 * @property {number} id l'identifiant de la carte
 *
 */

/**
 * Le produit à vendre
 * @typedef {object} Product
 * @property {number} [id=Date.now()] L'identifiant de l'article
 * @property {string} title Titre de l'article
 * @property {string} slug Le slug pour l'URL descriptif de l'article
 * @property {number} price Le prix de l'article
 * @property {string} description description de l'article
 * @property {string} [imageUrl="https://loremflickr.com/g/500/320/product,book?lock=5"] image de l'article
 * @property {number} rating La note de l'article
 */

/**
 * Le produit à vendre
 * @typedef {object} ProductModel
 * @property {number} [id=Date.now()] L'identifiant de l'article
 * @property {string} title Titre de l'article
 * @property {string} slug Le slug pour l'URL descriptif de l'article
 * @property {number} price Le prix de l'article
 * @property {string} description description de l'article
 * @property {string} [imageUrl="https://loremflickr.com/g/500/320/product,book?lock=5"] image de l'article
 * @property {number} rating La note de l'article
 * @property {string} slug L'URL vers l'article
 */

/**
 * @typedef {object} UserModel Le model de l'UTILISATEUR
 * @property {number} id l'identifiant de l'utilisateur
 * @property {string} username le username de l'utilisateur
 * @property {string} email l'email de l'utilisateur
 * @property {string} firstname Le prenom de l'utilisateur
 * @property {string} lastname Le nom de l'utilisateur
 * @property {string} password Le mot de passe de l'utilisateur
 * @property {string} address L'adresse de l'utilisateur
 * @property {string} slug Le lien d'URL de l'utilisateur
 *
 */
