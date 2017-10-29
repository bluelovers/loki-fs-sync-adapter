/**
 * Created by user on 2016/10/13.
 */

import LokiFsSyncAdapter from './loki-fs-sync-adapter';

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
		root.LokiFsSyncAdapter = factory();
	}
}(this, () =>
	{
		return LokiFsSyncAdapter;
	}
));
