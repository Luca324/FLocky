export function fuzzyFilter(stringsArray, substring, getValue = (el) => el, sensitivity = 0) {

  const result = stringsArray.filter(el => {
    const string = getValue(el)
    // Проверяем, содержит ли строка подстроку, учитывая чувствительность
    if (string.toLowerCase().includes(substring.toLowerCase())) {
      return true; // Если содержит, возвращаем true
    } else {
      // Иначе, применяем приближенный поиск
      const distance = levenshteinDistance(string.toLowerCase(), substring.toLowerCase());
      return distance <= sensitivity; // Если расстояние меньше или равно чувствительности, возвращаем true
    }
  });
  console.log('inner search result:', result)
  return result
}

// Функция для вычисления расстояния Левенштейна (для приблизительного поиска)
function levenshteinDistance(str1, str2) {
  const n = str1.length;
  const m = str2.length;
  const matrix = [];

  for (let i = 0; i <= n; i++) {
    matrix[i] = new Array(m + 1).fill(0);
  }

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      if (i === 0) {
        matrix[i][j] = j;
      } else if (j === 0) {
        matrix[i][j] = i;
      } else {
        if (str1[i - 1] === str2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
        }
      }
    }
  }

  return matrix[n][m];
}
