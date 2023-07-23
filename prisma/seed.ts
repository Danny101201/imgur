
import axios from "axios"
import { prisma } from "./db"

const main = async () => {
  await prisma.image.deleteMany({})
  const result = await axios<Record<string, string>>('http://localhost:3000/data').then(res => res.data)
  let img =
    Object.entries(result)
      .map(([k, v]) => ({
        name: k,
        url: v
      }))
      .map(info => prisma.image.create({
        data: {
          name: info.name,
          url: info.url
        }
      }))
  await prisma.$transaction(img)
}

main()
  .then(() => {
    console.log('success seed data')
  })
  .catch(async (e) => {
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })

