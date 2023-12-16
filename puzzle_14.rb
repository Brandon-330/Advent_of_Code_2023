def calculate_total(map)
  total = 0
  map.each_with_index do |line, line_idx|
    sum_load = (map.size - line_idx)

    line.each_char do |char|
      total += sum_load if char == 'O'
    end
  end

  total
end

old_map = File.new('texts/puzzle_14.txt').read.split("\n")
map = old_map
previous_map = map.clone

memoize = Hash.new
counter = 0
start_loop = 0

loop do
  p memoize

  if memoize.key?(map)
    puts map if calculate_total(map) == 64
    old_map = map.dup
    map = memoize[map]
    break if counter == 1000000000
    p counter += 1
    next
  end

  # North
  map.each_with_index do |line, line_idx|
    if line_idx >= 1
      line.chars.each_with_index do |char, char_idx|
        if char == 'O'
          times_rolled = 0
          loop do
            break if ((line_idx - times_rolled) - 1 < 0) || /[#O]/.match?(map[(line_idx - times_rolled) - 1][char_idx])
            times_rolled += 1
          end

          map[line_idx][char_idx] = '.'
          map[line_idx - times_rolled][char_idx] = 'O'
        end
      end
    end
  end

  # West
  map.each_with_index do |line, line_idx|
    line.chars.each_with_index do |char, char_idx|
      if char_idx >= 1
        if char == 'O'
          times_rolled = 0
          loop do
            break if ((char_idx - times_rolled) - 1 < 0) || /[#O]/.match?(map[line_idx][(char_idx - times_rolled) - 1])
            times_rolled += 1
          end

          map[line_idx][char_idx] = '.'
          map[line_idx][char_idx - times_rolled] = 'O'
        end
      end
    end
  end
  
  # South
  map.reverse!.each_with_index do |line, line_idx|
    if line_idx >= 1
      line.chars.each_with_index do |char, char_idx|
        if char == 'O'
          times_rolled = 0
          loop do
            break if ((line_idx - times_rolled) - 1 < 0) || /[#O]/.match?(map[(line_idx - times_rolled) - 1][char_idx])
            times_rolled += 1
          end

          map[line_idx][char_idx] = '.'
          map[line_idx - times_rolled][char_idx] = 'O'
        end
      end
    end
  end.reverse!

  map.map! do |line|
    line.reverse
  end

  # East
  map.each_with_index do |line, line_idx|
    line.chars.each_with_index do |char, char_idx|
      if char_idx >= 1
        if char == 'O'
          times_rolled = 0
          loop do
            break if ((char_idx - times_rolled) - 1 < 0) || /[#O]/.match?(map[line_idx][(char_idx - times_rolled) - 1])
            times_rolled += 1
          end

          map[line_idx][char_idx] = '.'
          map[line_idx][char_idx - times_rolled] = 'O'
        end
      end
    end
  end

  map.map! do |line|
    line.reverse!
  end

  memoize[previous_map] = map

  previous_map = map

  counter += 1
end
p counter
p (counter - start_of_loop_idx)

f = File.new('texts/puzzle_14_results.txt', 'w')

total = 0
map.each_with_index do |line, line_idx|
  sum_load = (map.size - line_idx)

  f.write(line + "\n")

  line.each_char do |char|
    total += sum_load if char == 'O'
  end
end

puts total