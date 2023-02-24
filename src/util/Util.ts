export const prettyFormatTime = (time: Date): string => {
  /**
   * Converts the Date, `time`, into a string like '8 secs ago'
   */
  const diff_secs = 1 + Math.floor((new Date().getTime() - time.getTime()) / 1000.0);
  if (diff_secs < 60) {
    return diff_secs + (diff_secs == 1 ? ' second ago' : ' secs ago');
  }
  if (diff_secs < 60 * 60) {
    const diff_mins = Math.floor(diff_secs / 60);
    return diff_mins + (diff_mins == 1 ? ' minute ago' : ' mins ago');
  }
  if (diff_secs < 60 * 60 * 24) {
    const diff_hrs = Math.floor(diff_secs / (60 * 60));
    return diff_hrs + (diff_hrs == 1 ? ' hour ago' : ' hours ago');
  }
  if (diff_secs < 60 * 60 * 24 * 30.5) {
    const diff_days = Math.floor(diff_secs / (60 * 60 * 24));
    return diff_days + (diff_days == 1 ? ' day ago' : ' days ago');
  }
  if (diff_secs < 60 * 60 * 24 * 364) {
    const diff_months = Math.floor(diff_secs / (60 * 60 * 24 * 30.5));
    return diff_months + (diff_months == 1 ? ' month ago' : ' months ago');
  }
  const diff_years = Math.floor(diff_secs / (60 * 60 * 24 * 364.5));
  return diff_years + (diff_years == 1 ? ' year ago' : ' years ago');
};

export const nowMinusT = (seconds: number): Date => {
  /**
   * Returns a Date set to the current moment minus `seconds` seconds.
   */
  return new Date(new Date().getTime() - seconds * 1000);
};

export function lightenHex(col: string, amt: number): string {
  /**
   * Lightens a hex color 'col' by the amount 'amt' (a number between 1 and 255).
   */

  let usePound = false;

  if (col[0] == '#') {
    col = col.slice(1);
    usePound = true;
  }

  let R = parseInt(col.substring(0, 2), 16);
  let G = parseInt(col.substring(2, 4), 16);
  let B = parseInt(col.substring(4, 6), 16);

  R = R + amt;
  G = G + amt;
  B = B + amt;

  if (R > 255) R = 255;
  else if (R < 0) R = 0;

  if (G > 255) G = 255;
  else if (G < 0) G = 0;

  if (B > 255) B = 255;
  else if (B < 0) B = 0;

  const RR = ((R.toString(16).length == 1) ? '0' + R.toString(16) : R.toString(16));
  const GG = ((G.toString(16).length == 1) ? '0' + G.toString(16) : G.toString(16));
  const BB = ((B.toString(16).length == 1) ? '0' + B.toString(16) : B.toString(16));

  return (usePound ? '#' : '') + RR + GG + BB;
}

export const uuid = (): string => {
  /**
   * Generates a unique id based on the current time
   */
  const dateStr = Date
    .now()
    .toString(36); // convert num to base 36 and stringify

  const randomStr = Math
    .random()
    .toString(36)
    .substring(2, 8); // start at index 2 to skip decimal point

  return `${dateStr}-${randomStr}`;
};
