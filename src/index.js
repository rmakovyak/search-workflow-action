import { Octokit } from '@octokit/core';
import * as core from '@actions/core';

const run = async () => {
  try {
    const owner = core.getInput('owner');
    const repo = core.getInput('repo');
    const status = core.getInput('status');
    const event = core.getInput('event');
    const name = core.getInput('name');
    const auth = core.getInput('GITHUB_AUTH_TOKEN');

    const octokit = new Octokit({
      auth
    });

    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/actions/runs?conclusion={status}&event={event}',
      {
        owner,
        repo,
        conclusion: status,
        event
      }
    );

    const workflowRun = response.data.workflow_runs.filter(
      ({ name: n }) => n === name
    )[0];

    core.setOutput('data', workflowRun);
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
