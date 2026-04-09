# SynthAI Frontend

## CI/CD

This project uses an automated CI/CD pipeline on GitHub Actions:

- code linting (ESLint)
- application build
- unit tests
- Docker image build and Trivy security scan

The pipeline runs automatically on every push or pull request to the repository.

## Integration Test Reports

Generate integration tests with CI-friendly and human-readable reports:

```bash
npm run test:int:report
```

Generated artifacts:

- `reports/integration/junit.xml` (JUnit XML for CI)
- `reports/integration/report.html` (HTML report)
- `reports/integration/coverage/` (coverage output)
