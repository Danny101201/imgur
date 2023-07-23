import { prisma } from "./prisma/db";

const main = async () => {
  try {

    const img = await prisma.image.findFirstOrThrow({
      where: {
        name: 'NO182'
      }
    })
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}

async function findMissingCode(total: number) {
  try {
    let no = 1
    while (true) {
      const result: { missing_code: string }[] = await prisma.$queryRaw`
      --  if not exist will return 1
      SELECT ${'NO' + String(no)} as  "missing_code" 
        FROM Image 
        WHERE NOT EXISTS (
          SELECT 1
          FROM Image
          WHERE name = ${'NO' + String(no)}
        )
      `
      if (result.length) {
        console.log(result)
      }
      no++
      if (no === total) break
    }
    console.log('check finish')
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

findMissingCode(241)