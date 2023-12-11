f = File.new('texts/puzzle_4.txt').readlines
lotteries = f.map do |line|
              colon_idx = line.index(':')
              line.gsub("\n", '')[colon_idx + 2..-1].split(' | ')
end

idx = 0
lotteries = lotteries.each do |line|
  lotteries[idx] = [idx] + line.map do |str| 
    str.strip.split(' ').map { |str_num| str_num.to_i }
  end + [1]
  idx += 1
end

idx = 0
copies = lotteries.dup
total_scratchcards = 0
while !copies.empty?
  iter_line = p copies.shift
  idx = iter_line[0]
  winning_nums_arr = iter_line[1]
  nums_arr = iter_line[2]
  number_of_copies = iter_line[3]
  total_scratchcards += number_of_copies
  counter = nums_arr.count { |num| winning_nums_arr.include?(num) }

  number_of_copies.times do |_|
    counter.times do |iteration|
      copies[iteration][3] += 1 unless idx + 1 + iteration >= lotteries.size
    end
  end
end

puts total_scratchcards