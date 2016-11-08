import { Pipe, IMap, IAsserts, ITaskConfig } from 'development-core'

/**
 * jspm mate loader config
 * 
 * @export
 * @interface IJspmMate
 */
export interface IJspmMate {
    loader: string;
}

/**
 * bundle config
 * 
 * @export
 * @interface BundlesConfig
 */
export interface IBundlesConfig extends IAsserts {
    /**
     * the bundle app path relation to root site.
     * 
     * @type {string}
     * @memberOf BundlesConfig
     */
    rootUri?: string;
    /**
     * systemjs baseURL
     * 
     * @type {string}
     * @memberOf BundlesConfig
     */
    baseURL: string;
    /**
     * jspm config file full path.
     * 
     * @type {string}
     * @memberOf BundlesConfig
     */
    jspmConfig: string;
    /**
     * bundle main file.
     * 
     * @type {string}
     * @memberOf BundlesConfig
     */
    mainfile?: string;

    /**
     * mainfile pipe works.
     * 
     * @type {Pipe[]}
     * @memberOf IBundlesConfig
     */
    mainfilePipes?: Pipe[];
    /**
     * mainfile includes libs. 
     * default includes 
     *   ./system-polyfills.src.js,
     *   ./system.src.js
     * 
     * @type {string[]}
     * @memberOf IBundlesConfig
     */
    includes?: string[];
    /**
     * deploy bust.
     * 
     * @type {string}
     * @memberOf BundlesConfig
     */
    bust?: string;
    /**
     * the config to bundle jspm loader.
     * 
     * @type {IMap<IJspmMate>}
     * @memberOf BundlesConfig
     */
    jspmMetas?: IMap<IJspmMate>;
    /**
     * build Config.
     * 
     * @type {IBuidlerConfig}
     * @memberOf BundlesConfig
     */
    builder?: IBuidlerConfig;
    /**
     * custom template for bundle main file.
     * 
     * @type {string}
     * @memberOf BundlesConfig
     */
    systemConfigTempl?: string;
    /**
     * bundle group config, if not set will bundle all.
     * 
     * @type {(IMap<IBundleGroup> | ((config: IJspmTaskConfig) => IMap<IBundleGroup>)}
     * @memberOf BundlesConfig
     */
    bundles?: IMap<IBundleGroup> | ((config: IJspmTaskConfig) => IMap<IBundleGroup>)
}

/**
 * jspm task option.
 * 
 * @export
 * @interface IJspmTaskOption
 * @extends {ITaskOption}
 */
export interface IJspmTaskConfig extends ITaskConfig {
    option: IBundlesConfig
}

/**
 * jspm build config.
 * 
 * @export
 * @interface IBuidlerConfig
 */
export interface IBuidlerConfig {
    sfx?: boolean;
    minify: boolean;
    mangle: boolean;
    sourceMaps: boolean;
    separateCSS: boolean;
    lowResSourceMaps: boolean;
    config?: {
        paths?: any;
        rootURL?: string;
    };
}

/**
 * bundle group config.
 * 
 * @export
 * @interface IBundleGroup
 */
export interface IBundleGroup {
    /**
     * Whether to bundle this group.
     */
    bundle: boolean;

    /**
     * compile to es5.
     * 
     * @type {boolean}
     * @memberOf IBundleGroup
     */
    toES5?: boolean;
    /**
     *  Combine items together via addition.
     */
    combine: boolean;
    /**
     * Exclude groups or packages via subtraction.
     */
    exclude: string[];
    /**
     * the items to bundle to this group.
     * 
     * @type {(string[] | Map<string, string>)}
     * @memberOf IBundleGroup
     */
    items: string[] | IMap<string>;
    /**
     * bundle config.
     * 
     * @type {IBuidlerConfig}
     * @memberOf IBundleGroup
     */
    builder: IBuidlerConfig;
}

/**
 * jspm builder.
 *
 * @export
 * @class JSPMBuilder
 */
export interface IBuilder {
    /**
     * 
     * 
     * @param {string} name
     * @param {(string | string[])} src
     * @param {string} dest
     * @param {BundlesConfig} [bundlesConfig]
     * @returns {Promise<any>}
     * 
     * @memberOf IBuilder
     */
    bundleAll(name: string, src: string | string[], dest: string, bundlesConfig?: IBundlesConfig): Promise<any>;
    /**
     * Create group bundles using the bundle configuration. If no bundles are
     * specified, all groups will be bundles.
     *
     * Example:
     * bundler.bundle(['app', 'routes']);
     *
     * @param {Array} groups
     * @returns {Promise}
     */
    bundle(groups?: string | string[]): Promise<any>;
    /**
     * unbundle specified group
     * 
     * @param {(string | string[])} [groups]
     * @returns {Promise<any>}
     * 
     * @memberOf IBuilder
     */
    unbundle(groups?: string | string[]): Promise<any>;
}