export const logSession = (req: any, res: any, next: any) => {
  //console.log(req.session, 'SESSION');
  next();
}
