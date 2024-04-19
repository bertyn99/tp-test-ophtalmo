import { PrismaClient } from '@prisma/client';

export const mockUsers = [
  { email: "42@email.com", password: "42", id: "4200a8f5185294c4fee1b41e" },
  { email: "user1@example.com", password: "password", id: "661fa8f5185294c4fee1b41e" },
  { email: "user2@example.com", password: "password", id: "001fa8f5185294c4fee1b41e" },
  { email: "user3@example.com", password: "password", id: "111fa8f5185294c4fee1b41e" }
];

export const mockCobayes = [
  { nom: "Cobaye 1", prenom: 'jon', sexe: "Male", date_de_naissance: new Date("2020-01-01"), id: "661fa8f5185294c4fee1b41e" },
  { nom: "Cobaye 2", prenom: 'sophia', sexe: "Female", date_de_naissance: new Date("2020-01-02"), id: "001fa8f5185294c4fee1b41e" },
  { nom: "Cobaye 3", prenom: 'ronnie', sexe: "Male", date_de_naissance: new Date("2020-01-03"), id: "111fa8f5185294c4fee1b41e" }
];

export const mockSessions = [
  { cobaye_id: "661fa8f5185294c4fee1b41e", date_heure_de_debut: new Date(), duree_totale_de_port: 120, pauses: 30, id: "661fa8f5185294c4fee1b41e" },
  { cobaye_id: "001fa8f5185294c4fee1b41e", date_heure_de_debut: new Date(), duree_totale_de_port: 120, pauses: 30, id: "001fa8f5185294c4fee1b41e" },
  { cobaye_id: "111fa8f5185294c4fee1b41e", date_heure_de_debut: new Date(), duree_totale_de_port: 120, pauses: 30, id: "111fa8f5185294c4fee1b41e" }
];
const prisma = new PrismaClient();
async function main() {

  //remove user and cobaye  
  await prisma.session.deleteMany();
  await prisma.cobaye.deleteMany();
  await prisma.user.deleteMany();



  delete mockUsers[0].id;

  // Créer un utilisateur
  const user = await prisma.user.create({
    data: {
      ...mockUsers[0]
    },
  });
  console.log('User créé :', user);


  delete mockCobayes[0].id;

  // Créer un cobaye pour l'utilisateur
  const cobaye = await prisma.cobaye.create({
    data: {
      ...mockCobayes[0],
      user: {
        connect: { id: user.id },

      },
    }
  });
  console.log('Cobaye créé :', cobaye);

  // Connecter l'utilisateur au cobaye
  await prisma.user.update({
    where: { id: user.id },
    data: { cobaye: { connect: { id: cobaye.id } } },
  });
  console.log('Utilisateur connecté au cobaye :', user);

  // Créer une session pour le cobaye
  const session = await prisma.session.create({
    data: {
      cobaye_id: cobaye.id,
      date_heure_de_debut: new Date(),
      duree_totale_de_port: 120,
      pauses: [5, 10],
    },
  });
  console.log('Session créée :', session);
}

main()
  .catch((e) => {
    console.error('Erreur lors du seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });