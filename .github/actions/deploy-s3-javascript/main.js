const core = require('@actions/core')
// const github = require('@actions/github')
const exec = require('@actions/exec')

function run() {
  // 1) Get some input values
  const bucket = core.getInput('bucket', { required: true })
  const bucketRegion = core.getInput('bucket-region', { required: false })
  const distFolder = core.getInput('dist-folder', { required: true })

  // 2) Upload files
  // AWS S3
  // const s3Uri = `s3://${bucket}`
  // exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`)

  // DigitalOcean
  exec.exec(`doctl spaces sync ${distFolder} ${bucket}`)

  // AWS
  // const websiteUrl = `http://${bucket}.s3-website-${bucketRegion.amazonaws.com}`

  // DigitalOcean
  const websiteUrl = `https://${bucket}.nyc3.digitaloceanspaces.com`
  core.setOutput('website-url', websiteUrl) // ::set-output
}

run()
