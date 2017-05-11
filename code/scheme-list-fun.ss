;;; Define listA with seven elements 1,2,3,4,5,6 and 7
;;; Code 1 line that returns 5 from listA using car and cdr
;;; Code a second line that does the same thing using car cdr shorthand
(define listA (list 1 2 3 4 5 6 7))
(car (cdr (cdr (cdr (cdr listA)))))
(caddddr listA)
