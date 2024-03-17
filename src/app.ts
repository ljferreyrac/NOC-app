import { Server } from "./presentation/server";


const main = () => {
    Server.start();
    // console.log(envs);
}

(() => {
    main();
})();