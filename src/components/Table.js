import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import style from './componentsCSS/Table.module.css';
import { useSelector } from 'react-redux';
import statisticSelectors from '../redux/statistic/statistic-selectors';
import numberWithSpaces from '../helpers/numberWithSpaces';

let a = {
  Ё: 'YO',
  Й: 'I',
  Ц: 'TS',
  У: 'U',
  К: 'K',
  Е: 'E',
  Н: 'N',
  Г: 'G',
  Ш: 'SH',
  Щ: 'SCH',
  З: 'Z',
  Х: 'H',
  Ъ: "'",
  ё: 'yo',
  й: 'i',
  ц: 'ts',
  у: 'u',
  к: 'k',
  е: 'e',
  н: 'n',
  г: 'g',
  ш: 'sh',
  щ: 'sch',
  з: 'z',
  х: 'h',
  ъ: "'",
  Ф: 'F',
  Ы: 'I',
  В: 'V',
  А: 'a',
  П: 'P',
  Р: 'R',
  О: 'O',
  Л: 'L',
  Д: 'D',
  Ж: 'ZH',
  Э: 'E',
  ф: 'f',
  ы: 'i',
  в: 'v',
  а: 'a',
  п: 'p',
  р: 'r',
  о: 'o',
  л: 'l',
  д: 'd',
  ж: 'zh',
  э: 'e',
  Я: 'Ya',
  Ч: 'CH',
  С: 'S',
  М: 'M',
  И: 'I',
  Т: 'T',
  Ь: "'",
  Б: 'B',
  Ю: 'YU',
  я: 'ya',
  ч: 'ch',
  с: 's',
  м: 'm',
  и: 'i',
  т: 't',
  ь: "'",
  б: 'b',
  ю: 'yu',
  '.': ' ',
};
export default function TableStatistic({ color }) {
  const result = useSelector(statisticSelectors.getAllTransactions);

  function transliterate(word) {
    return word
      .split('')
      .map(function (char) {
        if (char === '.') {
          return;
        }
        return a[char] || char;
      })
      .join('');
  }
  const colorBG = el => {
    let indexColor = Object.keys(color).indexOf(
      transliterate(el.category).toLowerCase(),
    );
    return Object.values(color)[indexColor];
  };

  function getWithdrawTransactions() {
    let transactionArr = [];

    result.transactions.map(el => {
      if (el.category !== 'Доходы') {
        transactionArr.push(el);
      }
    });

    return transactionArr;
  }

  function getFilteredData() {
    var holder = {};

    getWithdrawTransactions().forEach(function (d) {
      if (holder.hasOwnProperty(d.category)) {
        holder[d.category] = holder[d.category] + d.amount;
      } else {
        holder[d.category] = d.amount;
      }
    });

    var newTransactionArray = [];

    for (let prop in holder) {
      newTransactionArray.push({ category: prop, amount: holder[prop] });
    }

    return newTransactionArray;
  }

  function getExpenses() {
    return getWithdrawTransactions().reduce(function (prev, cur) {
      return prev + cur.amount;
    }, 0);
  }

  function getIncome() {
    return result.transactions
      .filter(el => {
        if (el.category === 'Доходы') {
          return el;
        }
      })
      .reduce(function (prev, cur) {
        return prev + cur.amount;
      }, 0);
  }

  return (
    <div>
      <TableContainer className={style.tableContainer}>
        <Table aria-label="a dense table">
          <TableHead className={style.tableHead}>
            <TableRow className={style.tableRow}>
              <TableCell className={style.tableCell} align="left">
                Категория
              </TableCell>
              <TableCell className={style.tableCell} align="right">
                Сумма
              </TableCell>
            </TableRow>
          </TableHead>
          <>
            <TableBody>
              {getFilteredData().map((el, i) => {
                return (
                  <TableRow className={style.tableRow} key={i}>
                    <TableCell className={style.tableRowElement} align="left">
                      {el.category}
                      <div
                        style={{ backgroundColor: colorBG(el) }}
                        className={style.colorCategory}
                      ></div>
                    </TableCell>
                    <TableCell className={style.tableRowElement} align="right">
                      {numberWithSpaces(el.amount)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </>
        </Table>
      </TableContainer>
      <ul className={style.balances}>
        <li>
          Расходы:{' '}
          <span className={style.balances__spending}>
            {numberWithSpaces(getExpenses())}
          </span>
        </li>
        <li>
          Доходы:{' '}
          <span className={style.balances__income}>
            {numberWithSpaces(getIncome())}
          </span>
        </li>
      </ul>
    </div>
  );
}
