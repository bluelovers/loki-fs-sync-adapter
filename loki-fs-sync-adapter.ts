/**
 * Created by user on 2016/10/13.
 */

"use strict";

(function (root, factory)
{
	if (typeof define === 'function' && define.amd)
	{
		// AMD
		define([], factory);
	}
	else if (typeof exports === 'object')
	{
		// Node, CommonJS-like
		module.exports = factory();
	}
	else
	{
		// Browser globals (root is window)
		root.LokiIndexedAdapter = factory();
	}
}(this, function ()
	{
		return (function ()
		{

			var Loki = require('lokijs');

			function LokiFsSyncAdapter()
			{
				this.fs = require('fs');
			}

			Object.assign(LokiFsSyncAdapter.prototype, Loki.persistenceAdapters.fs.prototype, {
					loadDatabase: function (dbname, callback)
					{
						var err = null;
						var stats;

						try
						{
							stats = this.fs.statSync(dbname);
						}
						catch (err)
						{

						}

						//console.log(err, stats);

						if (!err && stats && stats.isFile())
						{
							try
							{
								// readFileSync() is the synchronous alternative to async readFile() which loki normally uses
								var data = this.fs.readFileSync(dbname, {
										encoding: 'utf8'
									}
								);
								callback(data);
							}
							catch (err)
							{
								callback(new Error(err));
							}
						}
						else
						{
							callback(null);
						}
					},

					saveDatabase: function (dbname, dbstring, callback)
					{
						try
						{
							this.fs.writeFileSync(dbname, dbstring);

							callback(null);
						}
						catch (err)
						{
							callback(err);
						}
					},
				}
			);

			//console.log(LokiFsSyncAdapter.prototype.loadDatabase === Loki.persistenceAdapters.fs.prototype.loadDatabase, LokiFsSyncAdapter, LokiFsSyncAdapter.prototype);

			return LokiFsSyncAdapter;

		}());
	}
));