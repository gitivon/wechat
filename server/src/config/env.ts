let domain: DOMAIN;

export enum DOMAIN {
  ORG = '.tuniu.org',
  COM = '.tuniu.com'
}

switch(process.env.NODE_ENV) {
  default:
    domain = DOMAIN.ORG
    break
  case 'pre':
  case 'prod':
  domain = DOMAIN.COM
    break
}

export { domain }