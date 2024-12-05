import {readFile} from "../utils/readFile";

const input = readFile('../inputs/day05.txt');

function ruleIncludesPage(rule: string, page: string): boolean {
    let pages = rule.split('|');
    return pages.includes(page);
}

function getRulesForPage(page: string, rules: string[]): string[] {
    return rules.filter(rule => ruleIncludesPage(rule, page));
}

function orderPages(pages: string[], rules: string[]): string[] {
    let orderedPages: string[] = [];

    for (let page of pages) {
        if (orderedPages.length === 0) {
            orderedPages.push(page);
        } else {
            const pagesFirst = [];
            const pagesLast = [];
            for (let rule of getRulesForPage(page, rules)) {
                let rulePages = rule.split('|');
                if (rulePages[0] === page) {
                    pagesLast.push(rulePages[1]);
                } else {
                    pagesFirst.push(rulePages[0]);
                }
            }
            const newOrderedPages = [];

            let includePage = false;

            for (let orderedPage of orderedPages) {
                if (pagesFirst.includes(orderedPage)) {
                    newOrderedPages.push(orderedPage);
                } else if(!includePage){
                    newOrderedPages.push(page);
                    newOrderedPages.push(orderedPage);
                    includePage = true;
                } else {
                    newOrderedPages.push(orderedPage);
                }
            }
            if (!includePage) {
                newOrderedPages.push(page);
            }

            orderedPages = newOrderedPages;
        }
    }
    return orderedPages;
}

function ruleIsAppliedCorrectly(rule: string, update: string): boolean {
    let rulePages = rule.split('|');
    let updatePages = update.split(',');

    if (!updatePages.includes(rulePages[0]) || !updatePages.includes(rulePages[1])) return true;

    for (let page of updatePages) {
        if (page === rulePages[0]) {
            return true;
        } else if (page === rulePages[1]) {
            return false;
        }
    }
    return true;
}

function getMiddlePage(pages: number[]): number {
    return pages[Math.floor(pages.length / 2)];
}

function getRulesAndUpdates(input: string): [string[], string[]] {
    let lines = input.split('\n');
    let rules = lines.splice(0, lines.findIndex(line => line === '\r'));
    rules.forEach((rule, index) => rules[index] = rule.trim());
    let updates = lines.splice(lines.findIndex(line => line === '\r') + 1, lines.length);
    updates.forEach((update, index) => updates[index] = update.trim());
    return [rules, updates];
}

function partOne(input: string) {
    let result = 0;

    let [rules, updates] = getRulesAndUpdates(input);

    for (let update of updates) {
        let isOrderedCorrectly = true;
        for (let rule of rules) {
            if (!ruleIsAppliedCorrectly(rule, update)) {
                isOrderedCorrectly = false;
                break;
            }
        }
        if (isOrderedCorrectly) {
            let pageNumbers = update.split(',').map(Number);
            result += getMiddlePage(pageNumbers);
        }
    }
    return result;
}

function partTwo(input: string) {
    let result = 0;

    let [rules, updates] = getRulesAndUpdates(input);

    for (let update of updates) {
        let isOrderedCorrectly = true;
        for (let rule of rules) {
            if (!ruleIsAppliedCorrectly(rule, update)) {
                isOrderedCorrectly = false;
                break;
            }
        }
        if (!isOrderedCorrectly) {
            let orderedPages = orderPages(update.split(','), rules);
            let pageNumbers = orderedPages.map(Number);
            result += getMiddlePage(pageNumbers);
        }
    }
    return result;
}

console.log('Part 1:', partOne(input));
console.log('Part 2:', partTwo(input));