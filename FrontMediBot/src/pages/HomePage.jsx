import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { MessageCircle, Zap, Shield, Globe } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bienvenue sur
            <span className="text-blue-600 block">FezaiChat</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Découvrez une interface de chat moderne et intuitive, conçue pour offrir 
            une expérience utilisateur exceptionnelle. Commencez une conversation 
            dès maintenant !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chat">
              <Button size="lg" className="w-full sm:w-auto bg-black text-white ">
                <MessageCircle className="mr-2 h-5 w-5 " />
                Commencer à chatter
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white text-black">
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pourquoi choisir notre plateforme ?
          </h2>
          <p className="text-lg text-gray-600">
            Une expérience de chat révolutionnaire avec des fonctionnalités avancées
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Réponses Instantanées
            </h3>
            <p className="text-gray-600">
              Obtenez des réponses rapides et précises à toutes vos questions 
              grâce à notre interface optimisée.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Sécurisé et Privé
            </h3>
            <p className="text-gray-600">
              Vos conversations sont protégées avec les plus hauts standards 
              de sécurité et de confidentialité.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Accessible Partout
            </h3>
            <p className="text-gray-600">
              Interface responsive qui s'adapte parfaitement à tous vos appareils, 
              mobile, tablette ou ordinateur.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à commencer votre conversation ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers d'utilisateurs qui font confiance à notre plateforme
          </p>
          <Link to="/chat">
            <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-black hover:text-white">
              <MessageCircle className="mr-2 h-5 w-5" />
              Lancer le chat maintenant
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

