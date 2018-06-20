/// <reference types="node" />
import { Base } from "./base";
import { RPC } from "./rpc";
import * as net from "net";
import { Options } from "./daemon";
import * as q from "bluebird";
import { Tuple } from './stratumerror';
export declare class Server extends Base {
    clients: any;
    daemons: any;
    opts: any;
    rpc: RPC;
    server: net.Server;
    constructor(opts?: any);
    _tooBusy(): any;
    expose(name: any): void;
    /**
     * Emits 'close' event when a connection was closed
     *
     * @param {Client} socket
     */
    closeConnection(socket: any): void;
    /**
     * Add daemons to this instance of Stratum server
     *
     * @return {Server}
     */
    addDaemon(definition: any): this;
    /**
     * Emits 'busy' event when the server is on high load
     * Emits 'connection' event when there's a new connection, passes the newly created socket as the first argument
     *
     * @param {Socket} socket
     */
    newConnection(socket: any): void;
    /**
     *
     * @param {Client} socket
     * @param {Buffer} buffer
     */
    handleData(socket: any, buffer: any): void;
    /**
     * Start the Stratum server, the RPC and any coind that are enabled
     *
     * @return {Q.promise}
     */
    listen(): q<{}>;
    close(): void;
    /**
     * Sends a Stratum result command directly to one socket
     *
     * @param {String} id UUID of the socket
     * @param {String} type The type of command, as defined in server.commands
     * @param {Array} array Parameters to send
     *
     * @return {Q.promise}
     */
    sendToId(id?: any, type?: any, array?: any): q<{}>;
    /**
     * Send a mining method or result to all connected
     * sockets
     *
     * Returns a promise, so when it's done sending, you can
     * do:
     *
     * server.broadcast('notify', [...params]).then(function(){
     *  console.log('done');
     * });
     *
     * @param {String} type
     * @param {Array} data
     * @returns {Q.promise}
     */
    broadcast(type?: any, data?: any): q<{}>;
    /**
     * Parse the incoming data for commands
     *
     * @param {Buffer} buffer
     * @returns {{string: string, cmds: Array}}
     */
    static getStratumCommands(buffer: any): {
        string: string | undefined;
        cmds: any[];
    };
    /**
     * Process the Stratum commands and act on them
     * Emits 'mining' event
     *
     * @param {Client} socket
     * @param {Array} cmds
     */
    static processCommands(socket: any, cmds: any): void;
    /**
     * Wraps the callback and predefine the ID of the current stratum call
     *
     * @param {Client} socket
     * @param {String} type
     * @param {String} id
     *
     * @returns {Function} curryed function
     */
    static bindCommand(socket: any, type: any, id: any): any;
    static rejected(msg: any): q<any>;
    static expose(base: any, name: any): (args: any, connection: any, callback: any) => void;
    static invalidArgs(id: any, name: any, expected: any, args: any): true | q<any>;
    static commands: {
        /**
         * Return subscription parameters to the new client
         *
         * @param id
         * @param {String} difficulty
         * @param {String} subscription
         * @param {String} extranonce1
         * @param {Number} extranonce2_size
         *
         * @returns {Q.promise}
         */
        subscribe(id?: any, difficulty?: any, subscription?: any, extranonce1?: any, extranonce2_size?: any): any;
        /**
         * Send if submitted share is valid
         *
         * @param {Number} id ID of the call
         * @param {Boolean} accepted
         * @returns {Q.promise}
         */
        submit(id?: any, accepted?: any): any;
        /**
         * Send an error
         *
         * @param {Number} id
         * @param {Array|String} error
         * @returns {Q.promise}
         */
        error(id?: any, error?: any): any;
        /**
         * Authorize the client (or not). Must be subscribed
         *
         * @param {Number} id
         * @param {Boolean} authorized
         *
         * @returns {Q.promise}
         */
        authorize(id?: any, authorized?: any): any;
        /**
         * Miner is asking for pool transparency
         *
         * @param {String} id txlist_jobid
         * @param {*} merkles
         */
        get_transactions(id?: any, merkles?: any): any;
        /**
         * Notify of a new job
         *
         * @param {Number} id
         * @param {*} job_id
         * @param {String} previous_hash
         * @param {String} coinbase1
         * @param {String} coinbase2
         * @param {Array} branches
         * @param {String} block_version
         * @param {String} nbit
         * @param {String} ntime
         * @param {Boolean} clean
         *
         * @returns {Q.promise}
         */
        notify(id?: any, job_id?: any, previous_hash?: any, coinbase1?: any, coinbase2?: any, branches?: any, block_version?: any, nbit?: any, ntime?: any, clean?: any): any;
        /**
         * Set the difficulty
         *
         * @param {Number} id
         * @param {Number} value
         * @returns {Q.promise}
         */
        set_difficulty(id?: any, value?: any): any;
    };
    static errors: Record<string, Tuple>;
    /**
     * Coin daemons, will spawn a process for each enabled process
     */
    static daemons: Record<string, Options>;
    static defaults: {
        /**
         * RPC to listen interface for this server
         */
        rpc: {
            /**
             * Bind to address
             *
             * @type {String}
             */
            host: string;
            /**
             * RPC port
             *
             * @type {Number}
             */
            port: number;
            /**
             * RPC password, this needs to be a SHA256 hash, defaults to 'password'
             * To create a hash out of your password, launch node.js and write
             *
             * require('crypto').createHash('sha256').update('password').digest('hex');
             *
             * @type {String}
             */
            password: string;
            /**
             * Mode to listen. By default listen only on TCP, but you may use 'http' or 'both' (deal
             * with HTTP and TCP at same time)
             */
            mode: string;
        };
        /**
         * The server settings itself
         */
        settings: {
            /**
             * Address to set the X-Stratum header if someone connects using HTTP
             * @type {String}
             */
            hostname: string;
            /**
             * Max server lag before considering the server "too busy" and drop new connections
             * @type {Number}
             */
            toobusy: number;
            /**
             * Bind to address, use 0.0.0.0 for external access
             * @type {string}
             */
            host: string;
            /**
             * Port for the stratum TCP server to listen on
             * @type {Number}
             */
            port: number;
        };
    };
}
