const app = require('./app');
const {sequelize} = require('./models');

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./openapi.json');

var options = {
  customCss: '.swagger-ui .topbar { display: none }'
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));    


const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de données synchronisée.');
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Impossible de se connecter à la base de données:', error);
  });
