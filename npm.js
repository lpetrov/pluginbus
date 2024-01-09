const util = require('util');
const exec = util.promisify(require('child_process').exec);

const listPackages = async () => {
    try {
        const { stdout } = await exec('npm list --json');
        // do something with the dependencies
        return JSON.parse(stdout);

    } catch (e) {
        console.error(e); // should contain code (exit code) and signal (that caused the termination).
        return false;
    }

};


module.exports = {
    'listPackages': listPackages
};