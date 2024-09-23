import { processURLs, URLHandler, getGithubRepoFromNpm, log, isValidUrl, RampUp, Correctness, BusFactor, ResponsiveMaintainer, License } from '../index';

const testURL = 'https://github.com/MadSons/ECE46100-Team';

describe('isValidUrl', () => {
  test('should return true for valid URLs', () => {
    expect(isValidUrl('https://www.example.com')).toBe(true);
    expect(isValidUrl('http://example.com')).toBe(true);
    expect(isValidUrl('https://example.com/path/to/page')).toBe(true);
    expect(isValidUrl('https://github.com/MadSons/ECE46100-Team')).toBe(true);
  });

  test('should return false for invalid URLs', () => {
    expect(isValidUrl('invalid-url')).toBe(false);
    expect(isValidUrl('Not A URL')).toBe(false);
  });
});


describe('RampUp', () => {
  test('should calculate the ramp-up score correctly', async () => {
    const rampUp = new RampUp(testURL);
    const result = await rampUp.calculate();
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(1);
    expect(result.latency).toBeGreaterThanOrEqual(0);
  });
});

describe('Correctness', () => {
  test('should calculate the correctness score correctly', async () => {
    const correctness = new Correctness(testURL);
    const result = await correctness.calculate();
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(1);
    expect(result.latency).toBeGreaterThanOrEqual(0);
  });
});

describe('BusFactor', () => {
  test('should calculate the bus factor score correctly', async () => {
    const busFactor = new BusFactor(testURL);
    const result = await busFactor.calculate();
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(1);
    expect(result.latency).toBeGreaterThanOrEqual(0);
  });
});

describe('ResponsiveMaintainer', () => {
  test('should calculate the responsive maintainer score correctly', async () => {
    const responsiveMaintainer = new ResponsiveMaintainer(testURL);
    const result = await responsiveMaintainer.calculate();
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(1);
    expect(result.latency).toBeGreaterThanOrEqual(0);
  });
});

describe('License', () => {
  test('should calculate the license score correctly for a repo with a compatible license', async () => {
    const license = new License(testURL);
    const result = await license.calculate();
    expect(result.score).toBe(1);
    expect(result.latency).toBeGreaterThanOrEqual(0);
  });

  test('should calculate the license score correctly for a repo without a compatible license', async () => {
    const license = new License('https://www.npmjs.com/package/unlicensed');
    const result = await license.calculate();
    expect(result.score).toBe(0);
    expect(result.latency).toBeGreaterThanOrEqual(0);
  });

  test('license for readme', async () => {
    const license = new License('https://github.com/cloudinary/cloudinary_npm');
    const result = await license.calculate();
    expect(result.score).toBe(1);
    expect(result.latency).toBeGreaterThanOrEqual(0);
  }, 20000); // Adding a timeout of 10 seconds

});



describe('getGithubRepoFromNpm', () => {
  test('should return GitHub URL for a known npm package', async () => {
    const result = await getGithubRepoFromNpm('express');
    expect(result).toBe('https://github.com/expressjs/express');
  });

  test('should return null for a non-existent package', async () => {
    const packageName = 'this-package-does-not-exist-12345';
    const result = await getGithubRepoFromNpm(packageName);
    
    expect(result).toBeNull();
  });
});
