;;; Brief example to get to know the Scheme Computer Language
;;; An absolute value function is defined called "abs"
;;; This function is then utilized twice
(define (abs x)
          (if (< x 0)
          (- x)
          x))
          
(abs -6)
(abs 6)
