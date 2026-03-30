import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // 1. Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Access Denied: No token provided" });
  }

  // 2. Extract the actual token string(i.e bearer ["token"])
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify the token using your Secret Key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach the user payload (id, isAdmin) to the req.user object
    req.user = verified; 
    
    // 5. Proceed to the next step
    next();
  } catch (err) {
    res.status(403).json({ msg: "Invalid Token" });
  }
};