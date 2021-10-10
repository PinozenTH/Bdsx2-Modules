"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupUtils = void 0;
const fs_1 = require("fs");
const fs = require("fs");
const path_1 = require("path");
const util_1 = require("util");
const AdmZip = require("adm-zip");
const ncp = require("ncp");
class BackupUtils {
    static async getWorldName(bedrockServerPath) {
        return BackupUtils.readFile(`${bedrockServerPath}/server.properties`)
            .then((data) => {
            const reg = /^level-name=(.+)/gim;
            const matches = (data.match(reg) || []).map((e) => e.replace(reg, "$1"));
            return matches ? matches[0].trim() : "Unknown";
        })
            .catch((err) => {
            console.log(`Failed to read ${bedrockServerPath}/server.properties ${err}`);
            return "Unknown";
        });
    }
    static async readFile(path) {
        return await fs_1.promises.readFile(path, "utf8");
    }
    static async removeDirectory(path) {
        if (!(await BackupUtils.directoryExists(path))) {
            return;
        }
        const removeEmptyFolder = (path) => {
            return fs_1.promises.rmdir(path).catch((err) => {
                console.log(`Failed to remove ${path}: ${err}`);
            });
        };
        return fs_1.promises.lstat(path).then((stats) => {
            if (stats.isDirectory()) {
                return fs_1.promises
                    .readdir(path)
                    .then((files) => Promise.all(files.map((file) => BackupUtils.removeDirectory((0, path_1.join)(path, file)))))
                    .then(() => removeEmptyFolder(path));
            }
            else {
                return fs_1.promises.unlink(path).catch((err) => {
                    console.log(`Failed to remove ${path}: ${err}`);
                });
            }
        });
    }
    static async directoryExists(filePath) {
        return new Promise((resolve) => {
            fs_1.promises.access(filePath)
                .then(() => {
                resolve(true);
            })
                .catch(() => {
                resolve(false);
            });
        });
    }
    static async createTempDirectory(worldName, handleError, tempName) {
        const now = new Date(Date.now());
        const addLeadingZero = (value) => {
            return `0${value}`.slice(-2);
        };
        const getTime = (date) => {
            return addLeadingZero(date.getHours()) + addLeadingZero(date.getMinutes()) + addLeadingZero(date.getSeconds());
        };
        const timeStamp = [now.getFullYear(), addLeadingZero(now.getMonth() + 1), addLeadingZero(now.getDate()), getTime(now)].join("-");
        const directory = tempName ? `temp/${tempName}` : `temp/${timeStamp}`;
        await BackupUtils.ensureDirectoryExists(`${directory}/${worldName}`, handleError);
        return directory;
    }
    static async removeTempDirectory(tempDirectory) {
        await BackupUtils.removeDirectory(tempDirectory).catch((err) => {
            console.log(`Failed to remove ${tempDirectory}: ${err}`);
        });
    }
    static async truncate(file, tempDirectory) {
        const truncateFile = (0, util_1.promisify)(fs.truncate);
        const [filePath, bytesCount] = file.split(":");
        await truncateFile(`${tempDirectory}/${filePath}`, Number(bytesCount)).catch((err) => {
            console.log(`Failed to truncate ${filePath}: ${err}`);
        });
    }
    static async zipDirectory(backupsPath, tempDirectory, worldName, handleError) {
        const destination = `${backupsPath}/${(0, path_1.basename)(tempDirectory)}_${worldName}.zip`;
        await BackupUtils.ensureDirectoryExists("backups", handleError);
        await new Promise((resolve) => {
            const zip = new AdmZip();
            zip.addLocalFolder(`${tempDirectory}/${worldName}`);
            zip.writeZip(destination, (err) => {
                if (err) {
                    handleError("Failed to create zip");
                    resolve(false);
                }
                console.log(`Saved to ${destination}`);
                resolve(true);
            });
        });
    }
    static async moveFiles(worldsPath, tempDirectory, worldName, handleError) {
        await new Promise((resolve) => {
            ncp(`${worldsPath}/${worldName}`, `${tempDirectory}/${worldName}`, {
                filter: (source) => {
                    return source.indexOf("lost") === -1;
                },
            }, (err) => {
                if (err) {
                    handleError(`${err}`);
                    resolve(false);
                }
                resolve(true);
            });
        });
    }
}
exports.BackupUtils = BackupUtils;
_a = BackupUtils;
BackupUtils.ensureDirectoryExists = async (filePath, handleError) => {
    if (!(await BackupUtils.directoryExists(filePath))) {
        await fs_1.promises.mkdir(filePath, { recursive: true }).catch((err) => {
            if (err.indexOf("EEXIST:") === -1) {
                handleError(`Failed to create directory: ${filePath}: ${err}`);
            }
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFja3VwVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJCYWNrdXBVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMkJBQXFDO0FBQ3JDLHlCQUF5QjtBQUN6QiwrQkFBc0M7QUFDdEMsK0JBQWlDO0FBRWpDLGtDQUFrQztBQUNsQywyQkFBMkI7QUFFM0IsTUFBYSxXQUFXO0lBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsaUJBQXlCO1FBQ3RELE9BQU8sV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLGlCQUFpQixvQkFBb0IsQ0FBQzthQUNoRSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNYLE1BQU0sR0FBRyxHQUFHLHFCQUFxQixDQUFDO1lBQ2xDLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekUsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ25ELENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsaUJBQWlCLHNCQUFzQixHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQzVFLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQVk7UUFDckMsT0FBTyxNQUFNLGFBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLENBQUM7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