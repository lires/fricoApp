# Frico'App
Frico’ est une **application mobile** innovante qui utilise **l'intelligence artificielle** pour transformer la gestion quotidienne des repas. En **analysant** les ingrédients **disponibles** dans le **réfrigérateur** de l’utilisateur, l’application propose des recettes **personnalisées**, **délicieuses** et en accord avec une démarche **éco-responsable**.

## Prérequis

Avant de commencer, assurez-vous que votre environnement est configuré correctement :

1. **Node.js**
   - [Node.js LTS](https://nodejs.org/) (recommandé : version 18 ou supérieure).

2. **Android Studio** (pour émuler un appareil Android )
    - [Lien de téléchargement de Android Studio](https://developer.android.com/studio)

3. **PostgresSQL**
    - [Lien de téléchargement de PostGresSQL](https://www.postgresql.org/download/)

4. **Installation des dépendances**
   - Clonez le projet, puis installez les dépendances :
     ```bash
     npm install
     ```
   - Si vous utilisez Yarn :
     ```bash
     yarn install
     ```
## Langage / Framework :

- **React Native** : Utilisé pour le développement d’applications mobiles multiplateforme. 
facilite la création d’interfaces utilisateur fluides et réactives, en utilisant le JavaScript (ou TypeScript) avec un large éventail de bibliothèques disponibles pour l’interopérabilité avec les composants natifs des plateformes Android et iOS.

- **Intégration de l'Intelligence Artificielle** : L’utilisation de bibliothèques comme TensorFlow ou ONNX avec React Native permet de tirer parti des algorithmes d’IA pour la personnalisation des recettes et l’analyse des ingrédients.

- **PostgreSQL** : Le backend peut être géré avec PostgreSQL pour stocker les données utilisateurs, les préférences, les recettes et les recommandations personnalisées, ce qui permet de maintenir une application scalable et efficace.

## **Fonctionnalités principales**

1. **Analyse des ingrédients disponibles** :
   - L’application utilise l’intelligence artificielle pour scanner les **ingrédients** présents dans le **réfrigérateur** de l’utilisateur.
   - Propose des **recettes personnalisées** en fonction des éléments trouvés, en s’assurant qu’elles sont adaptées aux goûts de l’utilisateur et compatibles avec un **mode de vie sain** et **durable**.

2. **Recommandations de recettes** :
   - Présente des **suggestions de repas** en accord avec une démarche **éco-responsable**.
   - Intègre des critères comme les **produits de saison**, les **restrictions alimentaires**, et les **préférences personnelles** (végétarien, sans gluten, etc.).

3. **Sensibilisation à une consommation durable** :
   - Propose des **conseils nutritionnels** adaptés pour encourager une **alimentation équilibrée** et **durable**.
   - Affiche l’**empreinte carbone** estimée de chaque recette pour sensibiliser les utilisateurs à l’impact environnemental de leur alimentation.
   - Suggestion de **substituts alimentaires** pour réduire l’empreinte carbone (comme des protéines végétales à la place de la viande).

4. **Planification des repas et suivi** :
   - Permet aux utilisateurs de **planifier** leurs **repas à l’avance**.
   - **Suivi des repas** consommés et de leur **impact environnemental** sur la durée.

5. **Service de livraison éco-responsable** (**offre premium**) :
   - Un service de **livraison hebdomadaire** de **denrées alimentaires de saison** et **éco-responsables**, accompagné de **menus préétablis**.
   - Utilisation de **matériaux d’emballage recyclables** ou **compostables**.
   - Options **flexibles** pour **modifier** les **menus** et les **ingrédients** en fonction des préférences de l’utilisateur.

6. **Interface conviviale et intuitive** :
   - **Design ergonomique** pour une utilisation facile et agréable.
   - Fonctionnalités de **filtre** et de **recherche** pour rechercher rapidement des **recettes**, des **ingrédients** ou des **conseils spécifiques**.
   - Notifications pour rappeler les utilisateurs de passer à de nouveaux repas, **gérer les stocks** et ne pas **gaspiller les aliments**.

## **Vision à long terme**
La vision à long terme de **Frico’** est d'aller encore plus loin avec une **offre premium** : un service de **livraison hebdomadaire** de **denrées alimentaires de saison**, **éco-responsables**, accompagnées de **menus préétablis** pour simplifier la vie tout en respectant la planète. 

**Frico’** s’engage à offrir une expérience utilisateur à la fois pratique, informative et respectueuse de l’environnement.
