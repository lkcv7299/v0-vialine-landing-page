class FakeESLint {
  static version = "9.0.0-local";
  static CLIEngine = { version: FakeESLint.version };

  constructor(options = {}) {
    this.options = options;
  }

  static async loadESLint() {
    return FakeESLint;
  }

  static getErrorResults(results) {
    return Array.isArray(results)
      ? results.filter((result) => (result?.errorCount ?? 0) > 0)
      : [];
  }

  static async outputFixes() {
    return;
  }

  async calculateConfigForFile() {
    return {
      plugins: [],
      rules: {},
    };
  }

  async lintFiles() {
    return [];
  }

  async loadFormatter() {
    return {
      format() {
        return "";
      },
    };
  }
}

module.exports = {
  ESLint: FakeESLint,
  CLIEngine: FakeESLint.CLIEngine,
  loadESLint: async () => FakeESLint,
};
