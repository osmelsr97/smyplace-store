# SmyPlace | Store

## Preview 📸

![SmyPlace-Store](smyplace-preview.png)

## Description:

This is an ecommerce project designed to provide a smooth and engaging online shopping experience. The application allows users to explore a wide variety of products, add them to their shopping cart, and place orders easily. With a focus on usability and responsive design, this ecommerce is built using [Next.js](https://nextjs.org/), [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/), and [PayPal](https://www.paypal.com/), ensuring optimal performance and scalability.

## Run `Dev` environment

1. Clone repo.
2. Create a copy of the `.env.template` file and rename it to `.env`.
3. Update the `.env` file variables.
4. Install Dependencies `npm install`.
5. Go up the database `docker compose up -d`.
6. Run [Prisma](https://www.prisma.io/) migrations `npx prisma migrate dev`
7. Run the database seed `npm run seed`
8. Clear the localStorage in the browser
9. Run project `npm run dev`.

## Build app:

1. `npm run build`
