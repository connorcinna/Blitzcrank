import {Client, ClientOptions, Collection} from "discord.js";
import {ApplicationCommandModule} from "./@types";

export default class BlitzClient extends Client {
    public commands: Collection<String, ApplicationCommandModule>;
    Error = function(): void {
        console.log('error loading file');
    }
    constructor(options: ClientOptions) {
        super(options);
        this.commands = new Collection();
        this.load_commands();
    }
    private load_commands(): void {
        fs.readdir("src/Commands/", (err: Error, files: string[]) => {
            if (err) this.Error();
            let jsfile = files.filter(f => f.split(".").pop() === "js");
            if(jsfile.length <= 0) {
                console.log("No commands found")
                return;
            }
            jsfile.forEach((f, i) => {
                let props = require(`./Commands/${f}`)
                console.log(`${f} loaded!`)
                this.commands.set(props.name, props);
            });
        });
    }
    private run(name: string, ...args: any[]): void {

    }
}