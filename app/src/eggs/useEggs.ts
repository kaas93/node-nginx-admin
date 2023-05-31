import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { distinct } from "../util/filters";

type Egg = "mirror";

const eggsAtom = atomWithStorage<Egg[]>("eggs", []);

export const useEggs = () => {
    const [eggs, setEggs] = useAtom(eggsAtom);

    const addEgg = (egg: Egg) => {
        setEggs([egg, ...eggs].filter(distinct));
    };

    const removeEgg = (egg: Egg) => {
        setEggs(eggs.filter(it => it === egg));
    };

    return { eggs, addEgg, removeEgg };
};