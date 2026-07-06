#!/usr/bin/env node
const { program } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const { spawnSync } = require("child_process");
const readline = require("readline");

function askProjectName(defaultName) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      `What's the name of your project? (${defaultName}): `,
      (answer) => {
        rl.close();
        resolve(answer.trim() || defaultName);
      },
    );
  });
}

program
  .version(require("../package.json").version)
  .arguments("[project-directory]")
  .description("Create a new Next.js project using the Nova template")
  .action(async (projectDir) => {
    try {
      const defaultName = projectDir || "my-nova-app";
      const projectName = await askProjectName(defaultName);
      const targetPath = path.join(process.cwd(), projectName);

      console.log(`\n🚀 Creating ${projectName}...`);
      await fs.ensureDir(targetPath);

      console.log("📂 Copying template files...");
      const templatePath = path.join(__dirname, "../template");
      await fs.copy(templatePath, targetPath, {
        filter: (src) => {
          const basename = path.basename(src);
          // Skip node_modules, .git, and .next directories
          return (
            basename !== "node_modules" &&
            basename !== ".git" &&
            basename !== ".next"
          );
        },
      });

      console.log("📝 Configuring project...");
      await processPackageJson(targetPath, projectName);

      console.log("📦 Installing dependencies...");
      installDependencies(targetPath);

      console.log(
        `\n✅ Thank you for using Nova! Your project is ready at ${targetPath}`,
      );
      console.log("\nNext steps:");
      console.log(`  cd ${projectName}`);
      console.log("  npm run dev");
    } catch (error) {
      console.error("Error creating project:", error);
      process.exit(1);
    }
  })
  .parse(process.argv);

async function processPackageJson(targetPath, projectName) {
  const packageJsonPath = path.join(targetPath, "package.json");

  if (await fs.pathExists(packageJsonPath)) {
    let packageJsonContent = await fs.readFile(packageJsonPath, "utf-8");

    // Replace EJS template variable if present
    packageJsonContent = packageJsonContent.replace(
      /<%=\s*projectName\s*%>/g,
      projectName,
    );

    const packageJson = JSON.parse(packageJsonContent);
    packageJson.name = projectName;

    await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }
}

function installDependencies(targetPath) {
  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  spawnSync(npmCmd, ["install"], {
    cwd: targetPath,
    stdio: "inherit",
    shell: true,
  });
}
