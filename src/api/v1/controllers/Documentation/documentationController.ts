import { NextFunction, Request, Response, Router } from 'express'
export const documentationController: Router = Router()

documentationController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send(`
    <!doctype html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" href="https://scontent.xx.fbcdn.net/v/t1.15752-9/293139154_789443618750353_5472249647598903685_n.png?stp=cp0_dst-png&_nc_cat=111&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeH5PR08YPWRCtz5K5vfuy9_2YrQ5cd0yDTZitDlx3TINJpGy47MlCiibfSgtDCDe5D5iSduH1Qj7qP8PWEuztCt&_nc_ohc=VNOJ-Em50AUAX-Se7fc&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVIFv55lr4DkQR1R_J3s1Uj3v7SYQ-0JkJGWb9iLcX4mbg&oe=6300DC09">
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                main: '#3B413C',
                accent: '#9DB5B2'
              }
            }
          }
        }
      </script>
    </head>
    <body>
      <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="https://scontent.xx.fbcdn.net/v/t1.15752-9/293344963_391042409683924_1395847345863600450_n.png?_nc_cat=109&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeE8G3Yg4C7Qb3jMEI1v1dDV-020Acl2A1X7TbQByXYDVcfJjiERTT6MdnwzzdYKhmAPstPSy501EMFADmXsMutN&_nc_ohc=8_LsuExpIX8AX8aJ04F&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVIhtFGG2TDrMZKZD_Mwisro8aHyluVrSyA4QluBGaUvJg&oe=62FEFC2E">
          <div class="text-center lg:w-2/3 w-full">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold text-main">CASLounge API v1 🎉</h1>
            <p class="mb-8 leading-relaxed">Backend service responsible for CASLounge via Web API's.</p>
            <div class="flex justify-center">
            <a class="inline-flex text-white bg-main border-0 py-2 px-6 focus:outline-none hover:bg-accent rounded text-lg" href="/api/v1/documentation">Get Started</a>
            </div>
          </div>
        </div>
      </section>
    </body>
    </html>
    `)
  } catch (error) {
    next(error)
  }
})

documentationController.get('/documentation', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send(`
    <!doctype html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" href="https://scontent.xx.fbcdn.net/v/t1.15752-9/293139154_789443618750353_5472249647598903685_n.png?stp=cp0_dst-png&_nc_cat=111&ccb=1-7&_nc_sid=aee45a&_nc_eui2=AeH5PR08YPWRCtz5K5vfuy9_2YrQ5cd0yDTZitDlx3TINJpGy47MlCiibfSgtDCDe5D5iSduH1Qj7qP8PWEuztCt&_nc_ohc=VNOJ-Em50AUAX-Se7fc&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVIFv55lr4DkQR1R_J3s1Uj3v7SYQ-0JkJGWb9iLcX4mbg&oe=6300DC09">
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          theme: {
            extend: {
              colors: {
                main: '#3B413C',
                accent: '#9DB5B2'
              }
            }
          }
        }
      </script>
      <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>
    </head>
    <body>
      <!-- component -->
      <div class="md:flex flex-col md:flex-row md:min-h-screen w-full drop-shadow-md">
        <div @click.away="open = false" class="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data="{ open: false }">
          <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between body-font">
            <a href="#" class="text-lg font-semibold tracking-widest text-gray-900 font-bold rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">CASLounge API v1</a>
            <button class="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline" @click="open = !open">
              <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
                <path x-show="!open" fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                <path x-show="open" fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
          <nav :class="{'block': open, 'hidden': !open}" class="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
            <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#getting-started">Getting Started</a>
            <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#auth">Auth</a>
            <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#user">User</a>
            <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#community">Community</a>
            <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#post">Post</a>
            <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#comment">Comment</a>
            <a class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline" href="#token">Token</a>
          </nav>
        </div>
        <div class="text-gray-600 body-font w-full bg-main flex-col>
          <section id="getting-started" class="text-gray-600 body-font w-full bg-main">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold text-white ml-2 mt-2">Getting Started</h1>
          </section>
          <section id="auth" class="text-gray-600 body-font w-full bg-main">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold text-white ml-2 mt-2">Auth</h1>
          </section>
          <section id="user" class="text-gray-600 body-font w-full bg-main">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold text-white ml-2 mt-2">User</h1>
          </section>
          <section id="community" class="text-gray-600 body-font w-full bg-main">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold text-white ml-2 mt-2">Community</h1>
          </section>
          <section id="post" class="text-gray-600 body-font w-full bg-main">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold text-white ml-2 mt-2">Post</h1>
          </section>
          <section id="comment" class="text-gray-600 body-font w-full bg-main">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold text-white ml-2 mt-2">Comment</h1>
          </section>
          <section id="token" class="text-gray-600 body-font w-full bg-main">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-bold text-white ml-2 mt-2">Token</h1>
          </section>
        </div>
      </div>
    </body>
    </html>
    `)
  } catch (error) {
    next(error)
  }
})
