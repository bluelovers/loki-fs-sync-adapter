/**
 * Created by user on 2017/10/29/029.
 */

import * as Loki from 'lokijs';
import * as fs from 'fs';

export class LokiFsSyncAdapter extends Loki.persistenceAdapters.fs
{
	public fs = fs;

	loadDatabase(dbname: string, callback: Function)
	{
		let err = null;
		let stats;

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
				let data = this.fs.readFileSync(dbname, {
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
	}

	saveDatabase(dbname: string, dbstring, callback: Function)
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
	}
}

export default LokiFsSyncAdapter;
