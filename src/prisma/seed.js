import { PrismaClient } from '@prisma/client';
async function main() {
  const prisma = new PrismaClient();

  // Créer un utilisateur
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'test1234',
    },
  });
  console.log('User créé :', user);

  // Créer un cobaye pour l'utilisateur
  const cobaye = await prisma.cobaye.create({
    data: {
      nom: 'John',
      prenom: 'Doe',
      date_de_naissance: new Date('1990-01-01T00:00:00.000Z'),
      sexe: 'M',
      userID: user.id,
    },
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