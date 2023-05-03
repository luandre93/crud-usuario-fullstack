type TDate = Date | string;
type TStr = string | number;

export class ConsoleLine {
    frontLn(str: TStr): void {
        let newDate: TDate = new Date(new Date().getTime()).toLocaleTimeString();
        console.log(`[${newDate}]> ${str}`);
    }
}