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
    let Miss_code: { missing_code: string }[] = []
    while (true) {
      const result: { missing_code: string }[] = await prisma.$queryRaw`
      --  if not exist will return 1
      SELECT ${'NO' + checkNumberValue(no)} as  "missing_code" 
        FROM Image 
        WHERE NOT EXISTS (
          SELECT 1
          FROM Image
          WHERE name = ${'NO' + checkNumberValue(no)}
        )
      `
      if (result.length) {
        Miss_code.push(...result)
      }
      no++
      if (no === total) break
    }
    console.log(removeDuplicatesObjArray(Miss_code))
    console.log('check finish')
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}
const removeDuplicatesObjArray = (arr: { missing_code: string }[]) => {
  let result = new Map()
  for (let item of arr) {
    result.set(item.missing_code, item)
  }

  return Array.from(result.values())
}

const checkNumberValue = (num: number) => {
  if (num < 10 && num >= 0) return '00' + String(num)
  if (num < 100 && num >= 10) return '0' + String(num)
  return String(num)
}
findMissingCode(241)